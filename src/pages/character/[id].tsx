import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

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

	return (
		<section>
			<h1>Character Detail</h1>
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
			<Image
				src={character.image}
				width={300}
				height={300}
				alt="Character image"
			/>
		</section>
	);
};

export default CharacterDetailPage;
