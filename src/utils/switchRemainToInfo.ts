interface RemainInfo {
    remainNum: number;
    remainStatus: string;
    soldOut: boolean;
}

export default function switchRemainToInfo(remain: string): RemainInfo {
    switch(remain) {
        case 'plenty':
            return {
                remainNum: 100,
                remainStatus: '100개 이상',
                soldOut: false
            }

        case 'some':
            return {
                remainNum: 30,
                remainStatus: '30~100',
                soldOut: false
            }

        case 'few':
            return {
                remainNum: 10,
                remainStatus: '30개 이하',
                soldOut: false
            }

        case 'empty':
            return {
                remainNum: 0,
                remainStatus: '품절',
                soldOut: true
            }

        case 'break':
            return {
                remainNum: 0,
                remainStatus: '판매중지',
                soldOut: true
            }

        default:
    }

    return {
        remainNum: 0,
        remainStatus: '알수없음',
        soldOut: true
    }
}