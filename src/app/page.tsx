"use client";
import { useEffect, useState } from "react";
import { fetchCharacters } from "@/api";
import Character, { CharacterProps } from "@/components/Character/Character";
import Sorting from "@/components/Sorting/Sorting";
import Search from "@/components/Search/Search";

import styles from "./page.module.scss";
import Loading from "@/components/Loading/Loading";

const Home: React.FC = () => {
	const [characters, setCharacters] = useState<CharacterProps[]>([]);
	const [filteredCharacters, setFilteredCharacters] = useState<
		CharacterProps[]
	>([]);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchAll();
	}, []);

	const fetchAll = async (sorting: string = "All") => {
		setLoading(true);
		const characters = await fetchCharacters(sorting);
		setLoading(false);
		setCharacters(characters);
		setFilteredCharacters(characters);
	};

	const handleSortingChange = async (sorting: string) => {
		setSelectedStatus(sorting);
		fetchAll(sorting);
	};

	const handleSearchQueryChanges = (query: string) => {
		const filteredCharacters = characters.filter((character) =>
			character.name.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredCharacters(filteredCharacters);
	};

	return (
		<main className={styles.main}>
			<h1 className={styles.title}>The Rick and Morty Characters</h1>
			<div className={styles.actions}>
				<Search onChange={handleSearchQueryChanges} />
				<Sorting
					selectedStatus={selectedStatus}
					onChange={handleSortingChange}
				/>
			</div>

			{loading && <Loading />}
			<ul className={styles["character-list"]}>
				{filteredCharacters.map((character) => (
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
