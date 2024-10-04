document.addEventListener('DOMContentLoaded', function () {

  function findAudibleTabs() {  
    //document.getElementById('find-audible-tabs').addEventListener('click', function() {
      chrome.tabs.query({}, function(tabs) {
        const tabsList = document.getElementById('tabs-list');
        tabsList.innerHTML = ''; // Clear previous results
        audibleTabFound = false;
        tabs.forEach(function(tab) {
          if (tab.audible) {
            audibleTabFound = true;
            const listItem = document.createElement('li');
            
            // Create link to activate the tab
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = tab.title;
            link.addEventListener('click', function() {
              chrome.tabs.update(tab.id, { active: true });
            });
            
            // Create button to mute the tab
            /*
            const muteButton = document.createElement('button');
            muteButton.textContent = 'Mute';
            muteButton.addEventListener('click', function() {
              chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
            });
            */
            
            listItem.appendChild(link);
            //listItem.appendChild(muteButton);
            tabsList.appendChild(listItem);
          }
        });

        if (!audibleTabFound) {
          const noTabsMessage = document.createElement('li');
          noTabsMessage.textContent = 'No tabs with sound on';
          tabsList.appendChild(noTabsMessage);
        }
      });
    //});
  }

  // Automatically check for audible tabs when the DOM content is loaded
  findAudibleTabs();

  // Set up the button to manually find audible tabs
  document.getElementById('find-audible-tabs').addEventListener('click', findAudibleTabs);


});