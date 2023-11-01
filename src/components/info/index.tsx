import styles from "./info.module.scss";

export default function Info({ label, text }: { label: string; text: string | number | never[] }) {
  return (
    <div className={styles.info}>
      <label>{label}</label>
      <p>{text}</p>
    </div>
  );
}
