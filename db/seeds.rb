# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require "CSV"

CSV.open("public/indicators/email.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end

CSV.open("public/indicators/domain.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end

CSV.open("public/indicators/url.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end

CSV.open("public/indicators/ip.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end

CSV.open("public/indicators/sha256.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end

CSV.open("public/indicators/md5.csv", "wb") do |csv|
  csv << ["Indicator", "Description"]
end
