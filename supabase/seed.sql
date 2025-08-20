-- auth.users table
WITH
    credentials (id, mail, pass) AS (
        SELECT
            *
        FROM
            (
                VALUES
                    (
                        '123e4567-e89b-12d3-a456-426614174000',
                        'user1@example.com',
                        'password1'
                    ),
                    (
                        '123e4567-e89b-12d3-a456-426614174001',
                        'user2@example.com',
                        'password2'
                    ),
                    (
                        '123e4567-e89b-12d3-a456-426614174002',
                        'user3@example.com',
                        'password3'
                    ),
                    (
                        '123e4567-e89b-12d3-a456-426614174003',
                        'user4@example.com',
                        'password4'
                    ),
                    (
                        '123e4567-e89b-12d3-a456-426614174004',
                        'user5@example.com',
                        'password5'
                    )
            ) AS users (id, mail, pass)
    ),
    create_user AS (
        INSERT INTO
            auth.users (
                id,
                instance_id,
                ROLE,
                aud,
                email,
                raw_app_meta_data,
                raw_user_meta_data,
                is_super_admin,
                encrypted_password,
                created_at,
                updated_at,
                last_sign_in_at,
                email_confirmed_at,
                confirmation_sent_at,
                confirmation_token,
                recovery_token,
                email_change_token_new,
                email_change
            )
        SELECT
            id::uuid,
            '00000000-0000-0000-0000-000000000000',
            'authenticated',
            'authenticated',
            mail,
            '{"provider":"email","providers":["email"]}',
            '{}',
            FALSE,
            crypt (pass, gen_salt ('bf')),
            NOW (),
            NOW (),
            NOW (),
            NOW (),
            NOW (),
            '',
            '',
            '',
            ''
        FROM
            credentials RETURNING id
    )
INSERT INTO
    auth.identities (
        id,
        provider_id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
SELECT
    gen_random_uuid (),
    id,
    id,
    json_build_object ('sub', id),
    'email',
    NOW (),
    NOW (),
    NOW ()
FROM
    create_user;

-- posts
INSERT INTO
    "public"."posts" (
        "id",
        "created_at",
        "updated_at",
        "user_id",
        "question",
        "hint",
        "answer",
        "tags",
        "is_draft",
        "likes_count",
        "comments_count"
    )
VALUES
    (
        '9bf4d1eb-4b9c-4776-a008-ab2a1ff9bb5d',
        '2025-08-20 01:53:03.531068',
        '2025-08-20 01:53:03.531068',
        '123e4567-e89b-12d3-a456-426614174000',
        'この問題文はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。',
        'このヒントはダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。',
        'この答えはダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。',
        '{"tag1"}',
        'false',
        '0',
        '0'
    );