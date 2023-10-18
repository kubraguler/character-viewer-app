import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./[id].module.scss";

const baseURL = "https://rickandmortyapi.com/graphql";

const CharacterDetailPage: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const [character, setCharacter] = useState<any>();

	useEffect(() => {
		if (id) {
			const getData = async () => {
				const query = `
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
						setCharacter(data.data.character);
					}
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};

			getData();
		}
	}, [id]);

	// TODO: Add Loading component
	if (!character) {
		return <p>Loading...</p>;
	}

	// TODO: Show episodes etc
	return (
		<section className={styles["character-detail"]}>
			<Image
				className={styles["character-img"]}
				src={character.image}
				width={300}
				height={300}
				alt="Character image"
			/>
			<h1>Character Detail</h1>
			<p>{character.name}</p>
			<p>{character.status}</p>
			<p>{character.species}</p>
			<p>{character.gender}</p>
			<p>{character.origin.name}</p>
			<p>{character.location.name}</p>
		</section>
	);
};

export default CharacterDetailPage;
