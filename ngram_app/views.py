from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import nltk
from nltk.util import ngrams
from nltk.tokenize import word_tokenize
from nltk import FreqDist

nltk.download('punkt')

@csrf_exempt
def get_ngrams(request):
    if request.method == 'POST':
        texts = request.POST.getlist('texts[]', [])
        tokens = [word_tokenize(text.lower()) for text in texts]
        all_tokens = [token for tokens_list in tokens for token in tokens_list]
        bigrams = list(ngrams(all_tokens, 2))
        freq_dist = FreqDist(bigrams)
        most_common = freq_dist.most_common(10)
        return JsonResponse({'ngrams': most_common})

    return JsonResponse({'error': 'Invalid request method'})

