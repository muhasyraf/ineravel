<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // \App\Models\Note::factory(10)->create();

        // \App\Models\Note::factory(10)->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        for ($i = 1; $i <= 10; $i++) {
            if ($i % 2 != 0) {
                \App\Models\Note::insert([
                    'user_id' => User::find(1)->id,
                    'title' => $faker->words(3, true),
                    'content' => $faker->paragraph(4, false),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            } elseif ($i % 2 == 0) {
                \App\Models\Note::insert([
                    'user_id' => User::find(2)->id,
                    'title' => $faker->words(3, true),
                    'content' => $faker->paragraph(4, false),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
