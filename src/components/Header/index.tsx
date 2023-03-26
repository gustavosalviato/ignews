import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";
import Image from "next/image";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="logo" width={150} height={150} />
        <nav>
          <ActiveLink href="/" legacyBehavior activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink
            href="/posts"
            legacyBehavior
            activeClassName={styles.active}
          >
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
