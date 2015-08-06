# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

cities = City.find_or_create_by(:cname => 'Toronto', :description => 'This is the best city in the world!', :latitude => 43.7000, :longitude => -79.4000)

cities = City.find_or_create_by(:cname => 'New York', :description => 'This city is aiiiiite!', :latitude => 40.6700, :longitude => -73.9400)

cities = City.find_or_create_by(:cname => 'Chicago', :description => 'This is the second best city in the world!', :latitude => 41.8819, :longitude => -87.6278 )

cities = City.find_or_create_by(:cname => 'Los Angeles', :description => 'This city is live!', :latitude => 34.0500, :longitude => -118.2500)

cities = City.find_or_create_by(:cname => 'Las Vegas',  :description => 'Sin City...\'nuff said!', :latitude => 36.0800, :longitude => -115.1522)
