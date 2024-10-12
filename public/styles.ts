import { checkDescription } from "../libs/checkdescription";
import { checkSubscription } from "../libs/subscription";
import { checkSubscriptionCheck } from "../libs/subscriptioncheck";

interface DescriptionResult {
    description: number;
}

export const Styles = async () => {
    let MEGABYTES = 20;

    const isPro = await checkSubscription();
    const { description } = await checkDescription() as DescriptionResult;
    
    if(!isPro) {
        MEGABYTES = 20;
    }

    if(isPro) {
        if (description===1900) {MEGABYTES=20;}
        if (description===18000) {MEGABYTES=20;}
    
        if (description===4900) {MEGABYTES=40;}
        if (description===46800) {MEGABYTES=40;}
    
        if (description===14900) {MEGABYTES=50;}
        if (description===142800) {MEGABYTES=50;}
    }

    return MEGABYTES;
}