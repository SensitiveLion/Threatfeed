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
      if type == "ip"
        if @imput =~ Resolv::IPv4::Regex or @imput =~ Resolv::IPv6::Regex
          Submit.ip(@imput, @description)
          flash[:notice] = "you have added a new IP IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      elsif type == "domain"
        if /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/.match(@imput)
          Submit.domain(@imput, @description)
          flash[:notice] = "you have added a new domain IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      elsif type == "email"
        if /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/.match(@imput)
          Submit.email(@imput, @description)
          flash[:notice] = "you have added a new email IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      elsif type == "url"
        if @imput =~ URI::regexp
          Submit.url(@imput, @description)
          flash[:notice] = "you have added a new URL IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      elsif type == "md5"
        if /[0-9a-f]{32}/.match(@imput)
          Submit.md5(@imput, @description)
          flash[:notice] = "you have added a new md5 IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      elsif type == "sha256"
        if /[0-9a-f]{64}/.match(@imput)
          Submit.sha256(@imput, @description)
          flash[:notice] = "you have added a new sha256 IoC!"
          redirect_to '/'
        else
          flash[:notice] = "Indicator failed to be added check if you have the correct indicator type"
          redirect_to '/'
        end
      end
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description filled in"
      redirect_to '/'
    end
  end

  def submit_params
    params.require(:submit).permit(:imput, :description)
  end
end
