class Submit < ActiveRecord::Base
  require "CSV"
  require 'uri'
  require 'resolv'

  validates :imput, presence: true
  validates :description, presence: true

  def self.email(imput, description)
    if /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/.match(imput)
      CSV.open("public/indicators/email.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new email IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end

  def self.domain(imput, description)
    if /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.match(imput)
      CSV.open("public/indicators/domain.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new domain IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end

  def self.url(imput, description)
    if imput =~ URI::regexp
      CSV.open("public/indicators/url.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new URL IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end

  def self.ip(imput, description)
    if imput =~ Resolv::IPv4::Regex or imput =~ Resolv::IPv6::Regex
      CSV.open("public/indicators/ip.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new IP IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end

  def self.sha256(imput, description)
    if /[0-9a-f]{64}/.match(imput)
      CSV.open("public/indicators/sha256.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new sha256 IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end

  def self.md5(imput, description)
    if /[0-9a-f]{32}/.match(imput)
      CSV.open("public/indicators/md5.csv", "a") do |csv|
        csv << [imput, description]
      end
      flash[:notice] = "you have added a new md5 IoC!"
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
    redirect_to '/'
  end
end
