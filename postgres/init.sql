CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com') ON CONFLICT (email) DO NOTHING;
INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com') ON CONFLICT (email) DO NOTHING;