"use client";
import { useEffect, useState } from "react";
import Character from "@/components/Character";

import styles from "./page.module.scss";

const baseURL = "https://rickandmortyapi.com/graphql";

const Home: React.FC = () => {
	const [characters, setCharacters] = useState<any[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const query = `
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
					setCharacters(data.data.characters.results);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<main className={styles.main}>
			<div>
				<h1 className={styles.title}>Rick and Morty Characters</h1>
				<ul className={styles["character-list"]}>
					{characters.map((character) => (
						<li key={character.id} className={styles.character}>
							<Character
								id={character.id}
								name={character.name}
								status={character.status}
								species={character.species}
								image={character.image}
							/>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
};

export default Home;
