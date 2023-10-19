import styles from "./Sorting.module.scss";

interface SortingProps {
	selectedStatus: string;
	onChange: (sorting: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ selectedStatus, onChange }) => {
	return (
		<section className={styles.sorting}>
			<select
				className={styles.status}
				value={selectedStatus}
				onChange={(e) => {
					onChange(e.target.value);
				}}
			>
				<option value="All">All</option>
				<option value="Alive">Alive</option>
				<option value="Dead">Dead</option>
				<option value="Unknown">Unknown</option>
			</select>
		</section>
	);
};

export default Sorting;
