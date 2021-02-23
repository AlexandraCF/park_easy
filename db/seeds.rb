# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Cleaning database..."

User.destroy_all
# Parking_spot.destroy_all

puts "Creating users..."

User.create(username: "AlexandraC",
						first_name: "Alexandra",
						last_name: "Canuel",
						email: "alexandra@parkeasy.fr",
						password: "alexandra@parkeasy.fr",
						address: "128 Boulevard Voltaire, 75011 Paris")

User.create(username: "JavierC",
						first_name: "Javier",
						last_name: "Cuadrado",
						email: "javier@parkeasy.fr",
						password: "javier@parkeasy.fr",
						address: "8 Allée Verte, 75011 Paris")

User.create(username: "EdouardB",
						first_name: "Edouard",
						last_name: "Belfond",
						email: "edouard@parkeasy.fr",
						password: "edouard@parkeasy.fr",
						address: "13 Rue Oberkampf, 75011 Paris")

User.create(username: "YoannN",
						first_name: "Yoann",
						last_name: "Nomo",
						email: "yoann@parkeasy.fr",
						password: "yoann@parkeasy.fr",
						address: "18 Boulevard du Temple, 75003 Paris")

puts "Finished!"
