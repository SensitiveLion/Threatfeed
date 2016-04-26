class SubmitsController < ApplicationController
  def show
    render file: "public/indicators/#{params["id"]}.csv",  content_type: 'csv'
  end

  def create
    @imput = params[:submit][:imput]
    @description = params[:submit][:description]
    type = params[:submit][:kind]

    @ioc = Submit.new(submit_params)
    if @ioc.valid?
      flash[:notice] = "you have added a new indicator!"

      if type == "ip"
        Submit.ip(@imput, @description)
      elsif type == "domain"
        Submit.domain(@imput, @description)
      elsif type == "email"
        binding.pry
        Submit.email(@imput, @description)
      elsif type == "url"
        Submit.url(@imput, @description)
      elsif type == "md5"
        Submit.md5(@imput, @description)
      elsif type == "sha256"
        Submit.sha256(@imput, @description)
      end
    else
      flash[:notice] = "Indicator failed to be added check if you have an indicator and description"
    end
  end

  def submit_params
    params.require(:submit).permit(:imput, :description)
  end
end
