import Database from 'better-sqlite3'
import path from 'path'
const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'bookings.db')
const db = new Database(dbPath)

db.exec(`
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  phone TEXT,
  plan TEXT,
  start_date TEXT,
  end_date TEXT,
  days INTEGER,
  delivery TEXT,
  deposit_only INTEGER,
  stripe_session_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`)

export function addBooking(b: {
  name:string; email:string; phone?:string; plan:string;
  start_date:string; end_date:string; days:number; delivery:string;
  deposit_only:number; stripe_session_id?:string;
}) {
  const stmt = db.prepare(`INSERT INTO bookings
    (name,email,phone,plan,start_date,end_date,days,delivery,deposit_only,stripe_session_id)
    VALUES (@name,@email,@phone,@plan,@start_date,@end_date,@days,@delivery,@deposit_only,@stripe_session_id)`)
  const info = stmt.run(b)
  return info.lastInsertRowid
}

export function getBookingsBetween(start:string, end:string) {
  const stmt = db.prepare(`SELECT * FROM bookings WHERE NOT (end_date < ? OR start_date > ?)`)
  return stmt.all(start, end)
}
