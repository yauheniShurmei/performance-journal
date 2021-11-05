import Head from "next/head";
import AuthContext from "../components/store/auth-context";
import styles from "../styles/Home.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Table from "../components/Table/Table";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import Link from "next/dist/client/link";

export default function Home(props) {
  console.log("[INDEX.JS]");
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   if (!authCtx.isLoggedIn) {
  //     router.push("/login");
  //     return null;
  //   } else {
  //     router.replace("/data");
  //   }
  // }, [authCtx.isLoggedIn]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Performance Dziennik</title>
        <meta name="description" content="Dziennik lekcij Performance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <section>
        {authCtx.isLoggedIn && <Link href="/login">Log-in</Link>}
        <Link href="/">Log-out</Link>
      </section> */}

      <main className={styles.main}>
        <NavigationBar />
        <Table />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
