class CreateSubmits < ActiveRecord::Migration
  def change
    create_table :submits do |t|
      t.string :kind
      t.string :imput
      t.string :description
    end
  end
end
