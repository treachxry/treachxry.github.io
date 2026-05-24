CREATE TABLE IF NOT EXISTS analytics (
    [id] INTEGER PRIMARY KEY AUTOINCREMENT,
    [url] TEXT NOT NULL,
    [timestamp] INTEGER NOT NULL,
    [country] TEXT
);