console.log ("app.js connected! - 27-11-2023 - 11:50");

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

        // Ensure uniqueness
        const uniqueProjectNames = [...new Set(projectNames)];

        // Shuffle the array
        for (let i = uniqueProjectNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uniqueProjectNames[i], uniqueProjectNames[j]] = [uniqueProjectNames[j], uniqueProjectNames[i]];
        }

        // Return the specified count
        return uniqueProjectNames.slice(0, count);
    }

    // Example usage
    getRandomProjects(3).then(randomProjects => {
        if (randomProjects.length === 3) {
            const replacedString = `<p>I've worked with a wide range of clients including <strong>${randomProjects[0]}</strong>, <strong>${randomProjects[1]}</strong>, and <strong>${randomProjects[2]}</strong>.</p>`;

            // Update the content of the HTML element
            document.getElementById("worked_with").innerHTML = replacedString;

            // Output the result
            console.log(replacedString);
        } else {
            console.error('Unable to get three unique random projects');
        }
    });