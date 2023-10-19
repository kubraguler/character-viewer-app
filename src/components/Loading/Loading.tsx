import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
	return (
		<div className={styles.bouncer}>
			<div className={styles["bouncer-item"]}></div>
			<div className={styles["bouncer-item"]}></div>
			<div className={styles["bouncer-item"]}></div>
			<div className={styles["bouncer-item"]}></div>
		</div>
	);
};

export default Loading;
