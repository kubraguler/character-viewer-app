"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./page.module.scss";

const baseURL = "https://rickandmortyapi.com/graphql";

export default function Home() {
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
							gender
							image
							origin {
								id
								name
								type
							}
							location {
								id
								name
								type
							}
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
							<p>
								<b>Name:</b> {character.name}
							</p>
							<p>
								<b>Status:</b> {character.status}
							</p>
							<p>
								<b>Species:</b> {character.species}
							</p>
							<p>
								<b>Gender:</b> {character.gender}
							</p>
							{character.image && (
								<Image
									src={character.image}
									width={300}
									height={300}
									alt="Character image"
								/>
							)}
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}
