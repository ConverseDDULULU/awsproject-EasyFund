# survey_service.py

# Return a Korean risk class string based on survey scores
def calculate_risk_class(answers):
    score = sum(answers)

    if score <= 15:
        return "\uc548\uc815\ud615"  # 안정형
    elif score <= 25:
        return "\uc548\uc815\ucd94\uad6c\ud615"  # 안정추구형
    elif score <= 35:
        return "\uade0\ud615\ud615"  # 균형형
    elif score <= 45:
        return "\uc131\uc7a5\ud615"  # 성장형
    else:
        return "\uacf5\uaca9\ud615"  # 공격형
