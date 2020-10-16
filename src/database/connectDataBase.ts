import {open} from "sqlite"
import sqlite3 from "sqlite3"
import path from 'path'

const filename = path.resolve(__dirname, '../../DB/database.db')
// Regarder comment géré les cas d'erreur dans une fonction async
export default async function connectDataBase() {
  return open({
    filename: filename,
    driver: sqlite3.Database
  })
}