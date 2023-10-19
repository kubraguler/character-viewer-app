const baseURL = "https://rickandmortyapi.com/graphql";

export const fetchCharacters = async (sorting: string = "All") => {
	let query = `
        {
          characters {
            results {
              id
							name
							status
							species
							image
            }
          }
        }
      `;

	if (sorting !== "All") {
		query = `
        {
          characters(filter: { status: "${sorting}"}) {
            results {
              id
							name
							status
							species
							image
            }
          }
        }
      `;
	}

	try {
		const response = await fetch(baseURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		if (data.data && data.data.characters) {
			return data.data.characters.results;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
		return [];
	}
};

export const fetchCharacterDetails = async (id: string) => {
	let query = `
		{
			character(id: ${id}) {
				id
				name
				status
				species
				gender
				image
				origin {
					id
					name
				}
				location {
					id
					name
				}
				episode {
					id
					name
					episode
				}
			}
		}
	`;

	try {
		const response = await fetch(baseURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		if (data.data && data.data.character) {
			return data.data.character;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
