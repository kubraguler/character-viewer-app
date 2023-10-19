import Link from "next/link";
import Image from "next/image";

import styles from "./Character.module.scss";

export interface CharacterProps {
	id: number;
	name: string;
	status: string;
	species: string;
	image: string;
}

const Character: React.FC<CharacterProps> = ({
	id,
	name,
	status,
	species,
	image
}) => {
	return (
		<Link href={`/character/${id}`}>
			{image && (
				<Image
					src={image}
					width={300}
					height={300}
					alt="Character image"
					priority={false}
					className={styles["character-image"]}
				/>
			)}
			<p className={styles["character-name"]}>{name}</p>
			<div className={styles["character-detail"]}>
				<span
					className={`${styles["character-status__icon"]} ${
						status === "Alive"
							? styles["alive"]
							: status === "Dead"
							? styles["dead"]
							: styles["unknown"]
					}`}
				></span>
				<span>
					{status} ~ {species}
				</span>
			</div>
			<span className={styles["character-species"]}></span>
		</Link>
	);
};

export default Character;
