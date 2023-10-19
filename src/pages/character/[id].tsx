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
			<div className={styles["character-card"]}>
				<Image
					className={styles["character-img"]}
					src={character.image}
					width={300}
					height={300}
					alt="Character image"
				/>
				<h2 className={styles["character-name"]}>{character.name}</h2>
				<div className={styles["character-info"]}>
					<p>
						{character.status} ~ {character.species} ~ {character.gender}
					</p>
					<p>
						<b>Origin: </b>
						{character.origin.name}
					</p>
					<p className={styles["character-location"]}>
						<b>Location: </b>
						{character.location.name}
					</p>
					<hr />
					<h3 className={styles["episode-title"]}>
						<b>Episodes</b>
					</h3>
					<ul className={styles["episode-list"]}>
						{character.episode.map((item: any) => (
							<li key={item.id} className={styles["episode-item"]}>
								{item.episode} - <i>{item.name}</i>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default CharacterDetailPage;
