class Submit < ActiveRecord::Base
  require 'csv'
  require 'uri'
  require 'resolv'

  validates :imput, presence: true
  validates :description, presence: true

  def self.ip(imput, description)
      CSV.open("public/indicators/ip.csv", "a") do |csv|
        csv << [imput, description]
      end
  end

  def self.domain(imput, description)
    CSV.open("public/indicators/domain.csv", "a") do |csv|
      csv << [imput, description]
    end
  end

  def self.email(imput, description)
    CSV.open("public/indicators/email.csv", "a") do |csv|
      csv << [imput, description]
    end
  end

  def self.url(imput, description)
    CSV.open("public/indicators/url.csv", "a") do |csv|
      csv << [imput, description]
    end
  end

  def self.md5(imput, description)
    CSV.open("public/indicators/md5.csv", "a") do |csv|
      csv << [imput, description]
    end
  end

  def self.sha256(imput, description)
    CSV.open("public/indicators/sha256.csv", "a") do |csv|
      csv << [imput, description]
    end
  end
end
