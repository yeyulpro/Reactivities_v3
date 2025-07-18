using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validator
{
    public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
    {
        public BaseActivityValidator(Func<T, TDto> selector)
        {
            RuleFor(x => selector(x).Title)
                .NotEmpty().WithMessage("Title is Required")
                .MaximumLength(100).WithMessage("Title must not exceed 100 characters");
            RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("Description is Required");
            RuleFor(x => selector(x).Date)
            .GreaterThan(DateTime.Now).WithMessage("Date must be in the future.");
            RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Category is required");
            RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("City is required");
            RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("Venue is required");
            RuleFor(x => selector(x).Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90");
            RuleFor(x => selector(x).Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180");
   

        }
    }
}