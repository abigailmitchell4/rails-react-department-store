class Api::ProductsController < ApplicationController
  before_action :set_department
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    render json: @department.products.all
  end

  def create
    product = @department.products.new(product_params)
    if product.save
      render json: product 
    else
      render json: { errors: product.errors }
    end
  end

  def update
    @product.update(product_params)
    render json: @product
  end

  def destroy
    @product.destroy
    render json: { message: "product deleted" }
  end

  private
    def set_product
      @product = Product.find(params[:id])
    end

    def set_department
      @department = Department.find(params[:department_id])
    end

    def product_params
      params.require(:product).permit(:name, :description)
    end
end
