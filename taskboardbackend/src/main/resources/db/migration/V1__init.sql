CREATE TABLE users (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       name VARCHAR(255) NOT NULL,
       role VARCHAR(50) NOT NULL DEFAULT 'USER',
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_email ON users(email);

CREATE TABLE boards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_board_owner ON boards(owner_id);


CREATE TABLE board_columns (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
       name VARCHAR(255) NOT NULL,
       position INTEGER NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW(),
       UNIQUE(board_id, position)
);

CREATE INDEX idx_column_board ON board_columns(board_id);

CREATE TABLE tasks (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       column_id UUID NOT NULL REFERENCES board_columns(id) ON DELETE CASCADE,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
       priority VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
       due_date DATE,
       position INTEGER NOT NULL,
       created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_task_column ON tasks(column_id);
CREATE INDEX idx_task_assignee ON tasks(assignee_id);
CREATE INDEX idx_task_created_by ON tasks(created_by);


CREATE TABLE comments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
      author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comment_task ON comments(task_id);
CREATE INDEX idx_comment_author ON comments(author_id);