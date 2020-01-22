using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions // extension method, we are not going to be instanciating this class anywhere.
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6)
            .WithMessage("Password must be at least 6 characters.")
            .Matches("[A-Z]")
            .WithMessage("Password must contains at least one uppercase letter.")
            .Matches("[a-z]")
            .WithMessage("Password must contains at least one lowercase letter.")
            .Matches("[0-9]")
            .WithMessage("Password must contains at least one digit.")
            .Matches("[^a-zA-Z0-9]")
            .WithMessage("Password must contains at least non alphanumeric.");
            return options;
        }
    }
}