document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cardsContainer = document.getElementById('cardsContainer');
    const itemCount = document.getElementById('itemCount');
    const searchInput = document.getElementById('searchInput');
    
    // Split pane elements
    const resizer = document.getElementById('dragMe');
    const detailPane = document.getElementById('detailPane');
    const listPane = document.getElementById('listPane');
    
    // Detail Pane Content
    const detailEmptyState = document.getElementById('detailEmptyState');
    const detailContent = document.getElementById('detailContent');
    const closeDetail = document.getElementById('closeDetail');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    
    // State
    let globalData = [];
    let activeFilters = {
        topic: 'all', // 'all' or specific topic string
        difficulty: [], // array of difficulties
        status: [], // array of statuses
        customTags: [] // array of custom tags
    };
    
    // Resizer Logic
    let isResizing = false;
    
    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        // Prevent text selection while dragging
        document.body.style.userSelect = 'none';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        // Calculate new width for detail pane (right side)
        // detailPane width = window width - mouse X position
        const newWidth = window.innerWidth - e.clientX;
        
        // Boundaries
        const minWidth = 300;
        const maxWidth = window.innerWidth * 0.8;
        
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            detailPane.style.width = `${newWidth}px`;
        }
    });
    
    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    });

    // Fetch the JSON data
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            globalData = data;
            updateSidebarCounts();
            applyFiltersAndRender();
        })
        .catch(err => console.error("Failed to load data.json", err));

    // --- Sidebar Filtering Logic ---
    
    function updateSidebarCounts() {
        const counts = {};
        const customTagsSet = new Set();

        globalData.forEach(item => {
            const topics = Array.isArray(item.topic) ? item.topic : [item.topic];
            topics.forEach(t => {
                counts[t] = (counts[t] || 0) + 1;
            });
            
            if (Array.isArray(item.customTags)) {
                item.customTags.forEach(tag => customTagsSet.add(tag));
            }
        });
        
        // Update DOM
        for (const [topic, count] of Object.entries(counts)) {
            const countSpan = document.getElementById(`count-${topic}`);
            if(countSpan) countSpan.textContent = `[${count}]`;
        }

        // Build Custom Tags Filters
        const customTagsFilters = document.getElementById('customTagsFilters');
        if (customTagsFilters) {
            customTagsFilters.innerHTML = '';
            customTagsSet.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag custom';
                span.textContent = tag;
                
                span.addEventListener('click', () => {
                    span.classList.toggle('active');
                    if (span.classList.contains('active')) {
                        activeFilters.customTags.push(tag);
                    } else {
                        activeFilters.customTags = activeFilters.customTags.filter(val => val !== tag);
                    }
                    applyFiltersAndRender();
                });
                
                customTagsFilters.appendChild(span);
            });
        }
    }

    // Topic Filters
    const topicItems = document.querySelectorAll('#topicFilters li');
    topicItems.forEach(li => {
        li.addEventListener('click', (e) => {
            topicItems.forEach(i => i.classList.remove('active'));
            li.classList.add('active');
            activeFilters.topic = li.getAttribute('data-topic');
            applyFiltersAndRender();
        });
    });

    // Tag Filters (Difficulty & Status)
    const filterTags = document.querySelectorAll('.filter-tags .tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            tag.classList.toggle('active');
            
            const filterType = tag.parentElement.id === 'difficultyFilters' ? 'difficulty' : 'status';
            const filterValue = tag.getAttribute('data-filter');
            
            if (tag.classList.contains('active')) {
                activeFilters[filterType].push(filterValue);
            } else {
                activeFilters[filterType] = activeFilters[filterType].filter(val => val !== filterValue);
            }
            
            applyFiltersAndRender();
        });
    });

    // Search
    searchInput.addEventListener('input', () => {
        applyFiltersAndRender();
    });

    // Core Filter Engine
    function applyFiltersAndRender() {
        const query = searchInput.value.toLowerCase();
        
        const filteredData = globalData.filter(item => {
            // 1. Search Query
            const topicMatch = Array.isArray(item.topic) ? item.topic.some(t => t.toLowerCase().includes(query)) : item.topic.toLowerCase().includes(query);
            const matchesSearch = item.title.toLowerCase().includes(query) || 
                                  item.description.toLowerCase().includes(query) ||
                                  topicMatch;
            if (!matchesSearch) return false;
            
            // 2. Topic
            if (activeFilters.topic !== 'all') {
                const hasTopic = Array.isArray(item.topic) ? item.topic.includes(activeFilters.topic) : item.topic === activeFilters.topic;
                if (!hasTopic) return false;
            }
            
            // 3. Difficulty
            if (activeFilters.difficulty.length > 0 && !activeFilters.difficulty.includes(item.difficulty.toLowerCase())) {
                return false;
            }
            
            // 4. Status
            if (activeFilters.status.length > 0 && !activeFilters.status.includes(item.status.toLowerCase())) {
                return false;
            }
            
            // 5. Custom Tags (AND logic: must have all selected custom tags)
            if (activeFilters.customTags.length > 0) {
                if (!Array.isArray(item.customTags)) return false;
                const hasAllTags = activeFilters.customTags.every(t => item.customTags.includes(t));
                if (!hasAllTags) return false;
            }
            
            return true;
        });
        
        renderCards(filteredData);
    }

    // Date Formatter
    function formatDate(isoString) {
        if (!isoString) return "";
        // If it happens to be an old string like "2 days ago", just return it
        if (!isoString.includes('T')) return isoString;
        
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        
        if (diffHrs < 24 && diffHrs >= 0) {
            if (diffHrs === 0) {
                const diffMins = Math.floor(diffMs / (1000 * 60));
                return diffMins <= 1 ? "Just now" : `${diffMins} min ago`;
            }
            return `${diffHrs} hr ago`;
        } else {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options); // e.g. "19 July 2027"
        }
    }

    // Render list of cards
    function renderCards(data) {
        cardsContainer.innerHTML = '';
        itemCount.textContent = `${data.length} items`;

        data.forEach(item => {
            // Extract filename from path and remove extension
            const fileNameWithExt = item.filePath.split(/[/\\]/).pop();
            const fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.')) || fileNameWithExt;

            const card = document.createElement('div');
            card.className = 'card';
            card.id = `card-${item.id}`;
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-title-row">
                        <h3>${fileName}</h3>
                        <span class="tag ${item.difficulty.toLowerCase()}">${item.difficulty}</span>
                    </div>
                    <span class="card-meta">${formatDate(item.addedAt)}</span>
                </div>
                <p>${item.description}</p>
                <div class="card-actions">
                    ${(Array.isArray(item.topic) ? item.topic : [item.topic]).map(t => `<span class="tag topic">${t}</span>`).join('')}
                    ${Array.isArray(item.customTags) ? item.customTags.map(t => `<span class="tag custom">${t}</span>`).join('') : ''}
                    <span class="tag ${item.status.toLowerCase()}">${item.status}</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                // Highlight selected card
                document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                openDetailPane(item);
            });
            
            cardsContainer.appendChild(card);
        });
    }

    // Open detail in the right pane
    function openDetailPane(item) {
        detailEmptyState.classList.add('hidden');
        detailContent.classList.remove('hidden');
        
        // Ensure detail pane is visible if it was hidden on mobile (optional logic)
        detailPane.classList.remove('hidden-pane');

        // Extract filename from path and remove extension
        const fileNameWithExt = item.filePath.split(/[/\\]/).pop();
        const fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.')) || fileNameWithExt;

        document.getElementById('detailTitle').textContent = fileName;
        document.getElementById('detailDesc').textContent = item.description;
        
        document.getElementById('detailTags').innerHTML = `
            <span class="tag ${item.difficulty.toLowerCase()}">${item.difficulty}</span>
            <span class="tag solved">${item.status}</span>
            ${(Array.isArray(item.topic) ? item.topic : [item.topic]).map(t => `<span class="tag topic">${t}</span>`).join('')}
            ${Array.isArray(item.customTags) ? item.customTags.map(t => `<span class="tag custom">${t}</span>`).join('') : ''}
        `;

        const codeBlock = document.getElementById('detailCode');
        codeBlock.textContent = 'Loading code from repository...';
        codeBlock.removeAttribute('data-highlighted');
        codeBlock.className = 'language-python';
        
        const customNotesBlock = document.getElementById('detailCustomNotes');
        customNotesBlock.innerHTML = '';

        // Fetch custom markdown notes if provided
        if (item.customNotes) {
            fetch(item.customNotes)
                .then(res => {
                    if (res.ok) return res.text();
                    throw new Error("Notes file not found");
                })
                .then(markdown => {
                    if (markdown) {
                        customNotesBlock.innerHTML = marked.parse(markdown);
                    }
                })
                .catch(err => {
                    customNotesBlock.innerHTML = `<div style="padding: 15px; background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; color: #fca5a5; border-radius: 4px; margin-bottom: 20px;">
                        <strong>⚠️ Missing Notes File:</strong> Could not load the custom notes markdown file. Please verify the file exists at <code>${item.customNotes}</code> or update the path in <code>data.json</code>.
                    </div>`;
                    console.error("Error loading notes:", err);
                });
        }

        // Fetch python file dynamically
        fetch(item.filePath)
            .then(res => {
                if(!res.ok) throw new Error("File not found (" + res.status + ")");
                return res.text();
            })
            .then(code => {
                codeBlock.textContent = code;
                hljs.highlightElement(codeBlock);
            })
            .catch(err => {
                codeBlock.innerHTML = `<div style="padding: 15px; background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; color: #fca5a5; border-radius: 4px; font-family: var(--font-family, sans-serif); white-space: normal;">
                    <strong>⚠️ Missing Code File:</strong> Could not load the code file. Please verify the file exists at <code>${item.filePath}</code> or update the path in <code>data.json</code>.
                </div>`;
                console.error("Error loading code:", err);
            });
    }

    // Close detail pane entirely (optional UX feature)
    closeDetail.addEventListener('click', () => {
        detailContent.classList.add('hidden');
        detailEmptyState.classList.remove('hidden');
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    });

    // Reset Filters
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            activeFilters = {
                topic: 'all',
                difficulty: [],
                status: [],
                customTags: []
            };
            searchInput.value = '';
            
            // Reset UI
            topicItems.forEach(i => i.classList.remove('active'));
            document.querySelector('#topicFilters li[data-topic="all"]').classList.add('active');
            filterTags.forEach(t => t.classList.remove('active'));
            const customTagFilters = document.querySelectorAll('#customTagsFilters .tag');
            if (customTagFilters) customTagFilters.forEach(t => t.classList.remove('active'));
            
            applyFiltersAndRender();
        });
    }

    // Copy Code functionality
    let toastTimeout;
    const toastNotification = document.getElementById('toastNotification');
    
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeText = document.getElementById('detailCode').textContent;
            
            const showToast = () => {
                if (toastNotification) {
                    toastNotification.classList.remove('hidden');
                    if (toastTimeout) clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => { 
                        toastNotification.classList.add('hidden'); 
                    }, 3000);
                }
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(codeText)
                    .then(showToast)
                    .catch(err => console.error("Failed to copy", err));
            } else {
                // Fallback for file:// protocol or non-secure HTTP contexts
                const textArea = document.createElement("textarea");
                textArea.value = codeText;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    showToast();
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                
                document.body.removeChild(textArea);
            }
        });
    }
});
