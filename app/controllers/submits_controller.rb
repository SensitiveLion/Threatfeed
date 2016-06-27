class SubmitsController < ApplicationController
  require 'uri'
  require 'resolv'

  def show
    render file: "public/indicators/#{params["id"]}.csv",  content_type: 'csv'
  end

  def create
    @imput = params[:submit][:imput]
    @description = params[:submit][:description]
    type = params[:submit][:kind]
    @ioc = Submit.new(submit_params)

    if @ioc.valid?
      @imput = @imput.split("\r\n")

      @imput.each do |indicator|
        if type == "ip"
          if indicator =~ Resolv::IPv4::Regex or indicator =~ Resolv::IPv6::Regex
            Submit.ip(indicator, @description)
            flash[:notice] = "you have added a new IP IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        elsif type == "domain"
          if /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.match(indicator)
            Submit.domain(indicator, @description)
            flash[:notice] = "you have added a new domain IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        elsif type == "email"
          if /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/.match(indicator)
            Submit.email(indicator, @description)
            flash[:notice] = "you have added a new email IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        elsif type == "url"
          if indicator =~ URI::regexp
            Submit.url(indicator, @description)
            flash[:notice] = "you have added a new url IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        elsif type == "file name"
          Submit.file_name(indicator, @description)
          flash[:notice] = "you have added a new file name IoC!"
        elsif type == "md5"
          if /[0-9a-f]{32}/.match(indicator)
            Submit.md5(indicator, @description)
            flash[:notice] = "you have added a new md5 IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        elsif type == "sha256"
          if /[0-9a-f]{64}/.match(indicator)
            Submit.sha256(indicator, @description)
            flash[:notice] = "you have added a new sha256 IoC!"
          else
            flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          end
        end
      end
      redirect_to '/'
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description filled in"
      redirect_to '/'
    end
  end

  def submit_params
    params.require(:submit).permit(:imput, :description)
  end
end
