import { checkDescription } from "../libs/checkdescription";
import { checkSubscription } from "../libs/subscription";
import { checkSubscriptionCheck } from "../libs/subscriptioncheck";

interface DescriptionResult {
    description: number;
}

export const Constants = async () => {
    let MAX_FREE_COUNTS = 500;

    const isPro = await checkSubscription();
    const { description } = await checkDescription() as DescriptionResult;
    
    if(!isPro) {
        MAX_FREE_COUNTS = 500;
    }

    if(isPro) {
        if (description===1900) {MAX_FREE_COUNTS=25;}
        if (description===18000) {MAX_FREE_COUNTS=300;}
    
        if (description===4900) {MAX_FREE_COUNTS=120;}
        if (description===46800) {MAX_FREE_COUNTS=1440;}
    
        if (description===14900) {MAX_FREE_COUNTS=300;}
        if (description===142800) {MAX_FREE_COUNTS=3600;}
    }

    return MAX_FREE_COUNTS;
}