import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import RowComponent from '../components/RowComponent'
import { supabase, LectureLineaire } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import NewRowComponent from '../components/NewRowComponent'
import useLocalStorage from '../utils/useLocalStorage';

const Home: NextPage = () => {
  const [data, setData] = useState<any>();
  const [showDialog, setShowDialog] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [editData, setEditData] = useState<LectureLineaire>();
  const [access_level, _] = useLocalStorage('access_level', -1);

  const getData = async () => {
    const { data: LectureLineaire, error } = await supabase
    .from("LectureLineaire")
    .select()

    if (error) {
      console.error(error)
    } else {
      setData(LectureLineaire)
    }
  }
  const onDismiss = () => {
    setEditData(undefined);
    getData();
    setShowDialog(false);
  }
  const onEdit = (item: any) => {
    console.table(item);
    console.log(item.explanation)
    setEditData(
      {
        id: item.id,
        title: item.title,
        introduction: item.introduction,
        explanation: item.explanation,
        extract: item.extract,
        videoLink: item.videoLink,
      });
      setShowDialog(true)
  }

  useEffect(() => {
    console.log("Edit Data: ")
    console.log(editData?.introduction)
  }, [editData])


  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Lectures Lineaires</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
        <div className="flex flex-row justify-between p-4 overflow-scroll flex-nowrap">
          {
            // map data and display RowComponent with key
            // enumerate data

            data &&
              data.map((item: LectureLineaire, index: number) => {
              return (
                <RowComponent
                  key={index}
                  id={item.id}
                  title={item.title}
                  extract={item.extract}
                  videoLink={item.videoLink}
                  introduction={item.introduction}
                  explanation={item.explanation}
                  access_level={access_level}
                  onEdit={() => onEdit(item)}
                />
              );
            })
          }
          { access_level > 0 &&
            <button 
              className="buttonDefault shrink-0 h-fit" 
              onClick={() => setShowDialog(true)}
            >
              Ajouter nouvelle lecture 
              <svg xmlns="http://www.w3.org/2000/svg" className="inline w-6 h-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>          
            </button>
          }
        </div>
        { showDialog &&
        <NewRowComponent 
          isOpen={showDialog} 
          lecture={editData && editData}
          close={onDismiss}
        />
        }
      </main>
      <footer className={styles.footer}>
        © Copyright - {new Date().getFullYear()} - Christophe P.
      </footer>
    </div>
  );
}

export default Home
