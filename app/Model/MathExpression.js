let mathExpression = [];

function isLatin(chr)
{
    return ((chr >= 'a') && (chr <= 'z')) ||
           ((chr >= 'A') && (chr <= 'Z'));
}

export function MathExpressionClear()
{
    mathExpression = [];
}

export function MathExpressionGet()
{
    return mathExpression.join('');
}

export function MathExpressionAddElement(component)
{
    mathExpression.push(component);
    if (isElementRequireBracket(component))
        mathExpression.push('(');
}

export function MathExpressionRemoveLastElement()
{
    mathExpression.pop();
    if (mathExpression.length === 0)
        return;
    if (isElementRequireBracket(mathExpression.at(-1)))
        mathExpression.pop();
}

function isElementRequireBracket(element)
{
    return isLatin(element[0]);
}

function prepareMathExpression(expr)
{
    return expr.replaceAll(',', '.')
        .replaceAll('^', '**')
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos');
}

export function MathExpressionEvaluate(expression)
{
    return eval(prepareMathExpression(expression));
}
