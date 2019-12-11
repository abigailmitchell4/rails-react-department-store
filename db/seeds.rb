require 'faker'

10.times do
  department = Department.create(
    name: Faker::Commerce.department
  )

  100.times do
   department.products.create(
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      price: Faker::Commerce.price.to_f
      # department_id: department.id
    )
  end
end

puts "100 Products Seeded"