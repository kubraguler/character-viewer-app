import { useState, useEffect } from "react";
import styles from "./Search.module.scss";

interface SearchProps {
	query?: string;
	onChange: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ query = "", onChange }) => {
	const [value, setValue] = useState<string>("");

	useEffect(() => {
		if (query) {
			setValue(query);
		}
	}, [query]);

	const handleChange = (value: string) => {
		setValue(value);
		onChange(value);
	};

	return (
		<section className={styles.search}>
			<label>Search: </label>
			<input
				type="text"
				className={styles["search-input"]}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</section>
	);
};

export default Search;
