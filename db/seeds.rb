seed_file = File.join(Rails.root, 'db', 'seed.yml')
config = YAML::load_file(seed_file)
Article.create(config["articles"])
User::HABTM_Articles.create(config["articles_users"])

