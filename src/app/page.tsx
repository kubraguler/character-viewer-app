"use client";
import { useEffect, useState } from "react";
import { fetchCharacters } from "@/api";
import Character, { CharacterProps } from "@/components/Character/Character";
import Sorting from "@/components/Sorting/Sorting";

import styles from "./page.module.scss";

const Home: React.FC = () => {
	const [characters, setCharacters] = useState<CharacterProps[]>([]);
	const [sortedCharacters, setSortedCharacters] = useState<CharacterProps[]>(
		[]
	);

	const [selectedStatus, setSelectedStatus] = useState<string>("");

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async (sorting: string = "All") => {
		const characters = await fetchCharacters(sorting);
		setCharacters(characters);
		setSortedCharacters(characters);
	};

	const handleSortingChange = async (sorting: string) => {
		setSelectedStatus(sorting);
		fetchAll(sorting);
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>The Rick and Morty Characters</h1>
			<Sorting selectedStatus={selectedStatus} onChange={handleSortingChange} />
			<ul className={styles["character-list"]}>
				{characters.map((character) => (
					<li key={character.id} className={styles.character}>
						<Character
							image={character.image}
							id={character.id}
							name={character.name}
							status={character.status}
							species={character.species}
						/>
					</li>
				))}
			</ul>
		</main>
	);
};

export default Home;
