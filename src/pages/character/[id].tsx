import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchCharacterDetails } from "@/api";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";

import styles from "./[id].module.scss";

const CharacterDetailPage: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const [character, setCharacter] = useState<any>();

	useEffect(() => {
		if (id) {
			const characterId = String(id);
			fetchCharacter(characterId);
		}
	}, [id]);

	const fetchCharacter = async (id: string) => {
		const characters = await fetchCharacterDetails(id);
		setCharacter(characters);
	};

	if (!character) {
		return <Loading />;
	}

	return (
		<section className={styles["character-detail"]}>
			<Image
				className={styles["character-img"]}
				src={character.image}
				width={300}
				height={300}
				alt="Character image"
			/>
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
