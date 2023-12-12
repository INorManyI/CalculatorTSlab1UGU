import { Observable } from '@nativescript/core';
import { MathExpressionClear, MathExpressionGet, MathExpressionRemoveLastElement, MathExpressionAddElement, MathExpressionEvaluate } from "~/Model/MathExpression";

const viewModel = new Observable();

function ClearMathExpression()
{
    MathExpressionClear();
    viewModel.set('currentMathExpression', '');
    viewModel.set('previousMathExpression', '');
}

function RemoveLastElementFromMathExpression()
{
    MathExpressionRemoveLastElement();
    viewModel.set('currentMathExpression', MathExpressionGet());
}

function EvaluateMathExpression()
{
    let answer;
    try
    {
        answer = MathExpressionEvaluate(MathExpressionGet())
                .toString()
                .replace('.', ',');
    }
    catch (e)
    {
        answer = 'Ошибка';
    }
    viewModel.set('currentMathExpression', answer);
    viewModel.set('previousMathExpression', MathExpressionGet());
    MathExpressionClear();
    MathExpressionAddElement(answer.toString());
}

function AddElementToMathExpression(args)
{
    MathExpressionAddElement(args.object.mathElement);
    viewModel.set('currentMathExpression', MathExpressionGet());
}

export function getCalculatorViewModel()
{
    viewModel.ClearMathExpression = ClearMathExpression;
    viewModel.currentMathExpression = '';
    viewModel.EvaluateMathExpression = EvaluateMathExpression;
    viewModel.RemoveLastElementFromMathExpression = RemoveLastElementFromMathExpression;
    viewModel.AddElementToMathExpression = AddElementToMathExpression;
    return viewModel;
}
