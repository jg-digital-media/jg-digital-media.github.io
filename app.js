console.log ("app.js connected! - 27-11-2023 - 12:49");

//*reload page*/

let goto_portfolio = document.getElementById("goto_portfolio");
let refresh_projects = document.getElementById("refresh_projects");



function reloadlist() {
    
    location.reload();
}

refresh_projects.addEventListener( "click", reloadlist);

/*****

Retrieve Client Data
*****/

// Function to fetch JSON data from an external file
async function fetchJsonData() {

    try {

        const response = await fetch('data/client-list.json'); // Update the path to your actual JSON file
        const jsonData = await response.json();
        return jsonData;

    } catch (error) {

        console.error('Error fetching JSON data:', error);
    }

}

// Function to get three unique random project names
async function getRandomProjects(count) {

    const jsonData = await fetchJsonData();

    if (!jsonData || !jsonData.clients || jsonData.clients.length === 0) {

        console.error('Invalid JSON data');
        return [];
    }

    const projectNames = jsonData.clients.map(client => client.project_name);

    // Ensure no duplicated project names are returned
    const uniqueProjectNames = [...new Set(projectNames)];

    // Shuffle the array
    for (let i = uniqueProjectNames.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [uniqueProjectNames[i], uniqueProjectNames[j]] = [uniqueProjectNames[j], uniqueProjectNames[i]];
    }

    // Return the specified count
    return uniqueProjectNames.slice(0, count);
}

// list 3 project examples in text
getRandomProjects(3).then(randomProjects => {
    
    if (randomProjects.length === 3) {

        const replacedString = `<p>I've worked with a wide range of clients including <strong>${randomProjects[0]}</strong>, <strong>${randomProjects[1]}</strong>, and <strong>${randomProjects[2]}</strong>.</p>`;

        // Update the content of the HTML element
        document.getElementById("worked_with").innerHTML = replacedString;

        // Output the result
        console.log(replacedString);
        
    } else {

        const replacedString = `<p>I've worked with a wide range of clients including <strong>Auto Cleanse North East</strong>, <strong>Creative IO</strong>, and <strong>PM Consulting Ltd</strong>.</p>`;
        console.error('Unable to get three unique random projects');
    }

});

/*****

Retrieve Project List Data
*****/



// Fetch and load projects from external JSON file
        fetch('data/project-list.json')

            .then(response => response.json())
            .then(data => displayRandomProjects(data.projects));

        function displayRandomProjects(projects) {
            
            // Shuffle the projects array to get a random order
            const shuffledProjects = projects.sort(() => Math.random() - 0.5);

            // Take a certain number of projects (adjust as needed)
            const numProjectsToShow = 4; // Change this to the desired number
            const randomProjects = shuffledProjects.slice(0, numProjectsToShow);

            // Get the container element
            const container = document.getElementById("projectContainer");

            // Clear previous content
            container.innerHTML = '';

            // Append each random project to the container
            randomProjects.forEach(project => {
                
                const projectLink = document.createElement('a');
                projectLink.href = project.project_url;
                projectLink.target = '_blank';

                const projectImage = document.createElement('img');
                projectImage.src = project.img_url;
                projectImage.alt = 'Project';
                projectImage.title = 'Project';

                projectLink.appendChild(projectImage);
                container.appendChild(projectLink);
            });
        }


/*// Function to fetch JSON data from an external file
    async function fetchProjectJsonData() {
        
        try {
            const response = await fetch('data/project-list.json'); // Update the path to your actual JSON file
            const projectJsonData = await response.json();
            return jsonData;
            
        } catch (error) {
            
            console.error('Error fetching JSON data:', error);
        }
    }

    // Function to get a specified number of unique random projects
    function getRandomPortfolioProjects(data, count) {
        
        const projects = [...data.projects];
        const randomProjects = [];

        for (let i = 0; i < count && projects.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * projects.length);
            randomProjects.push(projects.splice(randomIndex, 1)[0]);
        }

        return randomProjects;
    }

    // Function to generate HTML for a project
    function generateProjectHTML(project) {
        return `<a href="${project.project_url}" target="_blank">
                    <img src="${project.img_url}" class="project_image" alt="${project.project_alt}" title="${project.project_name}" />
                </a>`;
    }

    // Function to render random projects in the container
    async function renderRandomProjects(containerId, count) {     
        
        
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`Container with id "${containerId}" not found.`);
            return;
        }

        const jsonData = await fetchJsonData();

        if (!jsonData || !jsonData.projects || jsonData.projects.length === 0) {
            console.error('Invalid projects data');
            return;
        }

        const randomProjects = getRandomProjects(jsonData, count);

        // Clear existing content
        container.innerHTML = "";

        // Generate and append HTML for each random project
        randomProjects.forEach(project => {
            
            const projectHTML = generateProjectHTML(project);
            container.innerHTML += projectHTML;
        });
    

        // Example usage: Render 4 random projects in the "projectContainer"
        renderRandomProjects("projectContainer", 4);
    }*/