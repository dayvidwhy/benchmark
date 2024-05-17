<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Defines a Survey that has many Questions
class Survey extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'surveys';

    protected $fillable = [
        'title'
    ];

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
