<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Defines a Question that is related to a Survey
class Question extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'questions';

    protected $fillable = [
        'label',
        'questionType',
        'description',
        'order'
    ];

    public function surveys(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }
}
