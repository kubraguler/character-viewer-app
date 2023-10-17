import Link from "next/link";
import Image from "next/image";

interface CharacterProps {
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
		<div>
			<Link href={`/character/${id}`}>
				<p>
					<b>Name:</b> {name}
				</p>
				<p>
					<b>Status:</b> {status}
				</p>
				<p>
					<b>Species:</b> {species}
				</p>
				{image && (
					<Image
						src={image}
						width={300}
						height={300}
						alt="Character image"
						priority={false}
					/>
				)}
			</Link>
		</div>
	);
};

export default Character;
